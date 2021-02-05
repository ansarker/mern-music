import express from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import Template from './../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import mediaRoutes from './routes/media.routes'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/theme'

import { matchRoutes } from 'react-router-config'
import routes from './../client/routeConfig'
import 'isomorphic-fetch'

import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

devBundle.compile(app)

const loadBranchData = (location) => {
    const branch = matchRoutes(routes, location)
    const promises = branch.map(({ route, match }) => {
        return route.loadData
            ? route.loadData(branch[0].match.params)
            : Promise.resolve(null)
    })
    return Promise.all(promises)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/', userRoutes)
app.use('/', mediaRoutes)
app.use('/', authRoutes)

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets()
    const context = {}

    loadBranchData(req.url).then(data => {
        const markup = ReactDOMServer.renderToString(
            sheets.collect(
                <StaticRouter location={req.url} context={context}>
                    <ThemeProvider theme={theme}>
                        <MainRouter data={data} />
                    </ThemeProvider>
                </StaticRouter>
            )
        )
        if (context.url) {
            return res.redirect(303, context.url)
        }
        const css = sheets.toString()
        res.status(200).send(Template({
            markup: markup,
            css: css
        }))
    }).catch(err => {
        res.status(500).send({ "error": "Could not load..." })
    })
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app