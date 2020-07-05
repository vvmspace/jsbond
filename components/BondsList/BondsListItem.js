const styles = {
    header: {
        name: {

        }
    }
}

import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import React, { Component } from 'react';


const readableDate = time => {
    const _date = new Date(time);

    let dd = _date.getDate();
    let mm = _date.getMonth() + 1;

    let yyyy = _date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${dd}.${mm}.${yyyy}`;
}

const daysLeft = time => Math.floor((
    time - new Date().getTime()
) / (24*3600*1000));

class BondsListItem extends Component {

    state = {
        open: false,
    }

    open = () => {
        this.setState({open: !(this.state.open)});
        console.log('open');
    }

    render() {

        const {open} = this.state;

        const bond = this.props.bond || {};
        const { lastPrice,
            faceValue,
            figi,
            isin,
            ticker,
            name,
            yieldToClient,
            totalYield,
            endDate,
            dateToClient,
            couponPeriodDays,
            currency,
            lot
        } = bond;

        const yieldy = (daysLeft(dateToClient) < 365) && Math.floor(10000 * ((faceValue * (100 + yieldToClient) / 100) - lastPrice) / lastPrice) /100;

        return <div className={'bonds-list-item'}>
            <div className={'bonds-list-item-head' + (open && ' open' || '')} style={{color: (lastPrice < faceValue) && 'green'
                    || (lastPrice < faceValue * 1.03) && 'black'
                    || '#999'}}
            onClick={this.open}
            >
                {name} <span className={'dop'}>{lastPrice} {currency} / {faceValue} {currency} / {couponPeriodDays} / {daysLeft(endDate)} d / {daysLeft(dateToClient)} d / {totalYield} % / {yieldToClient} %{yieldy && ` / ${yieldy} %`}</span>
            </div>
            <div className={'bonds-list-item-details' + (open && ' open' || '')}>
                <div
                    className={'tinkoff'}
                    style={{cursor: 'pointer'}}
                >{(typeof window !== 'undefined') && (<a style={{
                    display: 'block',
                    width: '100%',
                }} href={`https://www.tinkoff.ru/invest/bonds/${ticker}/`} target={'_blank'}
                ><img src={'/tinkoff.svg'} /></a>)
                || (<img src={'/tinkoff.svg'} />)}</div>
                <hr />
                <div className={'figi'}>Финансовый Глобальный Идентификатор инструмента: {figi}</div>
                <div className={'ticker'}>Тикер: {ticker}</div>
                <div className={'isin'}>ИСИН: {isin}</div>
                <hr />
                <div className={'face-value'}>Номинальная стоимость: {faceValue}</div>
                <div className={'last-price'}>Текущая стоимость: {lastPrice}</div>
                <div className={'last-price'}>Лот: {lot}</div>
                <div className={'last-price'}>Текущая доходность (totalYield): {totalYield} %</div>
                <div className={'last-price'}>Доходность к погашению (yieldToClient): {yieldToClient} %</div>
                {(daysLeft(dateToClient) < 365) && (<div>Доходность с вычетом разницы стоимости: {yieldy}%
                    <br /><span className={'small'}>Я хз как это считать ^^: (faceValue * (100 + yieldToClient) / 100) - lastPrice) / lastPrice</span>
                </div>)}
                <hr />
                <div className={'end-date'}>Дата выплаты купона: {readableDate(endDate)} ({daysLeft(endDate)} d)</div>
                <div className={'date-to-client'}>Дата погашения: {readableDate(dateToClient)} ({daysLeft(dateToClient)} d)</div>
                <div className={'coupon-period-days'}>Период выплаты купона: {couponPeriodDays}</div>

                {/*{JSON.stringify(props.bond)}*/}
            </div>
        </div>

    }

}

export default BondsListItem;