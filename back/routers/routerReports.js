import express from 'express'
import {getExpiredLots,getSalesInner,getMoneySoldMonth,getMoneySoldDAY,getMoneySoldWEEK,getOrderSellersMorSales,
    getSellersMorSalesMonth,getOrderClientsMorSales,getClientsMorSalesMonth} 
from '../controllers/controllerReports.js'

const routerReports = express.Router()

routerReports.get('/getExpiredLots', getExpiredLots)
routerReports.get('/getSalesInner', getSalesInner)
routerReports.get('/getMoneySoldMonth', getMoneySoldMonth)
routerReports.get('/getMoneySoldDAY', getMoneySoldDAY)
routerReports.get('/getMoneySoldWEEK', getMoneySoldWEEK)
routerReports.get('/getOrderSellersMorSales', getOrderSellersMorSales)
routerReports.get('/getSellersMorSalesMonth', getSellersMorSalesMonth)
routerReports.get('/getOrderClientsMorSales', getOrderClientsMorSales)
routerReports.get('/getClientsMorSalesMonth', getClientsMorSalesMonth)
// routerReports.get('/getMoneySoldDAY', getMoneySoldDAY)
// routerReports.get('/getMoneySoldWEEK', getMoneySoldWEEK)
// routerReports.get('/getOrderSellersMorSales', getOrderSellersMorSales)

export default routerReports
