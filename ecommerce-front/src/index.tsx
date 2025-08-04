// 导入 ConnectedRouter，用于将路由状态与 Redux 全局状态同步
// 这样可以实现路由跳转和 Redux 时间旅行、持久化等高级功能
import { ConnectedRouter } from "connected-react-router"

// 导入 React 主库，支持 JSX 语法和核心组件能力
import React from "react"

// 导入 ReactDOM，用于将 React 元素渲染到真实 DOM 节点上
import ReactDOM from "react-dom"

// 导入 Provider（react-redux 提供），将 Redux store 注入到整个应用
import { Provider } from "react-redux"

// 导入路由配置，定义了整个应用的页面路径和组件映射关系
import Routes from "./Routes"

// 导入 Redux store（全局状态管理中心）
import store from "./store/index"

// 导入路由历史对象，供 ConnectedRouter 使用，实现路由和 Redux 的绑定
import { history } from "./store"

// 导入全局样式表，影响整个应用的基础样式
import "./style.css"

// 导入自定义的 AnotherStore 组件，可能用于提供另一套全局状态（如 React Context、MobX、Zustand 等）
// 一般不推荐多套全局状态，除非有迁移需求或特殊场景
import AnotherStore from "./anotherStore"

/**
 * 应用程序入口渲染点。
 * 这里负责将整个 React 应用渲染到 DOM，并绑定全局状态管理与路由同步。
 * 
 * 渲染层级（从外到内）如下：
 * - Provider：注入 Redux store，所有子组件都可访问全局状态
 * - ConnectedRouter：使路由状态和 Redux 同步，实现统一管理
 * - AnotherStore：自定义全局状态 Provider（仅在确实需要时使用）
 * - Routes：路由配置，决定不同路径下渲染哪些页面组件
 * 
 * 最终把整个应用挂载到页面上的 #root 节点（public/index.html 里定义）
 */
ReactDOM.render(
  // Redux Provider：为整个组件树提供全局 Redux 状态
  <Provider store={store}>
    {/* 
      ConnectedRouter：
      - 路由与 Redux 状态同步
      - 支持时间旅行、持久化、Redux DevTools 等
      - 依赖 history 对象，必须保证一致
    */}
    <ConnectedRouter history={history}>
      {/*
        AnotherStore：
        - 自定义的全局状态 Provider
        - 只有在 Redux 不能满足需求或做架构迁移时才建议用
        - 多套全局状态增加维护复杂度，需权衡使用
      */}
      <AnotherStore>
        {/* 
          Routes：
          - 项目主路由配置
          - 根据路径切换页面组件
        */}
        <Routes />
      </AnotherStore>
    </ConnectedRouter>
  </Provider>,
  // 将 React 应用挂载到 index.html 的 #root 节点
  document.getElementById("root")
)
