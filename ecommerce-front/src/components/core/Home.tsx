// 导入 antd 组件库的布局与排版组件
// Row、Col：用于网格布局（响应式排列商品）
// Typography：排版相关（如标题、文本）
import { Col, Row, Typography } from "antd"

// 导入 React 主库和核心API
// useEffect：副作用钩子（用于组件挂载/更新时触发操作）
import React, { useEffect } from "react"

// 导入自定义的页面布局组件（用于统一站点结构、SEO等）
import Layout from "./Layout"

// 导入单个商品展示组件（用于商品卡片渲染）
import ProductItem from "./ProductItem"

// 导入商品搜索组件
import Search from "./Search"

// 导入Redux相关Hooks
// useDispatch：分发action以改变全局状态
// useSelector：从全局state中选取需要的数据
import { useDispatch, useSelector } from "react-redux"

// 导入“获取商品”这个action（用于请求不同排序的商品列表）
import { getProduct } from "../../store/actions/product.actions"

// 导入全局状态类型（用于TS类型约束）
import { AppState } from "../../store/reducers/index"
import { ProductState } from "../../store/reducers/product.reducer"

// 从Typography中解构Title组件（用于显示标题）
const { Title } = Typography

/**
 * Home 组件：电商首页（显示最新商品与最热商品）
 * - 页面结构：顶部布局/搜索，最新上架，最受欢迎
 * - 数据来源：Redux全局状态（商品列表），并在组件挂载时发起异步请求
 */
const Home = () => {
  // 获取Redux的dispatch方法，用于分发action
  const dispatch = useDispatch()

  // 从全局state.product中获取createdAt（最新商品）、sold（最热商品）两个数据片段
  // useSelector用于连接Redux和当前组件，TS类型保证类型安全
  const { createdAt, sold } = useSelector<AppState, ProductState>(
    state => state.product
  )

  // 组件首次挂载时执行，只运行一次（[]依赖为空数组）
  // 分别请求“最新上架商品”和“最受欢迎商品”两个列表，触发Redux异步action，数据拉取后会更新到全局状态
  useEffect(() => {
    dispatch(getProduct("createdAt"))  // 拉取按创建时间排序的商品
    dispatch(getProduct("sold"))       // 拉取按销量排序的商品
  }, [])

  // 页面UI渲染结构
  return (
    // Layout组件包裹全站布局，传递标题与副标题用于SEO和页面描述
    <Layout title="sww电商" subTitle="欢迎来到sww电商, 尽情享受吧">
      {/* 搜索栏组件 */}
      <Search />

      {/* 最新上架区块 */}
      <Title level={5}>最新上架</Title>
      <Row gutter={[16, 16]}>
        {createdAt.products.map(item => (
          // Col：响应式列布局，span=6表示一行可放4个商品
          <Col key={item._id} span={6}>
            {/* 单个商品卡片组件，props传递商品详情 */}
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>

      {/* 最受欢迎区块 */}
      <Title level={5}>最受欢迎</Title>
      <Row gutter={[16, 16]}>
        {sold.products.map(item => (
          <Col key={item._id} span={6}>
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

// 默认导出Home组件，供路由或其它模块使用
export default Home
