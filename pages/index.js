import Layout from "../layout/Layout";
import BondsList from "../components/BondsList/BondsList";
import BondsFilter from "../components/BondsFilter/BondsFilter";
import Head from "next/head";
import axios from 'axios';
import React, { Component } from 'react';

class Home extends Component {

    state = {
        filter: {
            cheaper: false,
            cheaper3: true,
            monthly: true,
        },
    };

    filterUpdate = filter => {
        this.setState({filter});
    }

    filter = () => {
        let bonds = this.props.bonds;
        if (this.state.filter.cheaper) {
            bonds = bonds.filter(bond => bond.lastPrice < bond.faceValue)
        }

        if (this.state.filter.cheaper3) {
            bonds = bonds.filter(bond => bond.lastPrice < 1.03 * bond.faceValue)
        }

        if (this.state.filter.monthly) {
            bonds = bonds.filter(bond => bond.endDate < new Date().getTime() + 31 * 24 * 3600 * 1000);
        }

        bonds
            .sort((a,b) => a.yieldToClient < b.yieldToClient)
            // .sort((a, b) => 2 * (a.couponPeriodDays > b.couponPeriodDays ? 1 : a.couponPeriodDays < b.couponPeriodDays ? -1 : 0)
            // + (a.endDate > b.endDate ? 1 : a.endDate < b.endDate ? -1 : 0))
            .filter(bond => (bond.dateToClient > new Date().getTime()))
            .filter(bond => (bond.yieldToClient > 0));

        if (this.state.filter.sortBy === 'lastPrice') {
            bonds = bonds.sort((a,b) => b.lastPrice * b.lot < a.lastPrice * a.lot);
        }
        if (this.state.filter.sortBy === 'kprice') {
            bonds = bonds.sort((a,b) => (b.lastPrice / b.faceValue) < (a.lastPrice / a.faceValue));
        }
        return bonds;
    }

    render() {

        const filtered = this.filter();

        return (
            <Layout>
                <div className="container">
                    <Head>
                        <title>JS Bond</title>
                        <link rel="icon" href="/favicon.ico"/>
                    </Head>
                    <h1>Облигации</h1>
                    <BondsFilter onChange={this.filterUpdate} filter={this.state.filter} />
                    <BondsList bonds={filtered}/>
                    {/*          <style jsx>{`*/}
                    {/*  .container {*/}
                    {/*    min-height: 100vh;*/}
                    {/*    padding: 0 0.5rem;*/}
                    {/*    display: flex;*/}
                    {/*    flex-direction: column;*/}
                    {/*    justify-content: center;*/}
                    {/*    align-items: center;*/}
                    {/*  }*/}

                    {/*`}</style>*/}
                </div>
            </Layout>
        )
    }
}


Home.getInitialProps = async function() {

    try {
        const res = await axios.get('https://api.jsbond.ru/bonds');
        const bonds = res.data.filter(bond => bond.endDate < new Date().getTime() + 1 * 30 * 24 * 3600 * 1000)
            // .filter(bond => bond.dateToClient < new Date().getTime() + 5 * 30 * 24 * 3600 * 1000)
            .sort((a,b) => a.yieldToClient < b.yieldToClient)
            .filter(bond => (bond.dateToClient > new Date().getTime()))
            .filter(bond => (bond.yieldToClient > 0))
        ;

        // console.log(bonds);


        return {
            bonds
        };
    } catch (e) {
        return { errorCode: 502 };
    }

};

export default Home;