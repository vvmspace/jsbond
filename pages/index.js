import Layout from "../layout/Layout";
import BondsList from "../components/BondsList/BondsList";
import Head from "next/head";
import axios from 'axios';

const Home = props => {
    return (
        <Layout>
            <div className="container">
                <Head>
                    <title>JS Bond</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                {/*<div className="grid">*/}
                    <a href="https://nextjs.org/docs" className="card">
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>
                {/*</div>*/}
                <BondsList bonds={props.bonds} />
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


Home.getInitialProps = async function() {

    console.log('GIP');

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