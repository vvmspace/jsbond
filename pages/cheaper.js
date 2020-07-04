import React, {Component} from 'react';
import Layout from "../layout/Layout";
import BondsList from "../components/BondsList/BondsList";
import Head from "next/head";
import axios from 'axios';
import BondsFilter from "../components/BondsFilter/BondsFilter";

class Cheaper extends Component {

    state = {
        filter: {
            cheaper: true,
            cheaper3: false,
            monthly: false,
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

        bonds.sort((a, b) => 2 * (a.couponPeriodDays > b.couponPeriodDays ? 1 : a.couponPeriodDays < b.couponPeriodDays ? -1 : 0)
            + (a.endDate > b.endDate ? 1 : a.endDate < b.endDate ? -1 : 0))
            .filter(bond => (bond.dateToClient > new Date().getTime()))
            .filter(bond => (bond.yieldToClient > 0));

        return bonds;
    }

    render() {

        const filtered = this.filter();

        return (
            <Layout>
                <div className="container">
                    <Head>
                        <title>Облигации дешевле номинала</title>
                        <link rel="icon" href="/favicon.ico"/>
                    </Head>
                    <BondsFilter onChange={this.filterUpdate} filter={this.state.filter} />
                    <BondsList bonds={filtered}/>
                </div>
            </Layout>
        )
    }
}


Cheaper.getInitialProps = async function () {

    console.log('GIP');

    try {
        const res = await axios.get('https://api.jsbond.ru/bonds');
        const bonds = res.data;

        // console.log(bonds);


        return {
            bonds
        };
    } catch (e) {
        return {errorCode: 502};
    }

};

export default Cheaper;