import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import XCard from '../components/XCard';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <XCard />
  </Layout>
)

export default IndexPage
