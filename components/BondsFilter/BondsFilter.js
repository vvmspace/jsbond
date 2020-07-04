import React, { Component } from 'react';

class BondsFilter extends Component {

    filters = this.props.filter || {};

    updateFilters = () => {
        if(this.props.onChange && (typeof this.props.onChange == 'function')) {
            this.props.onChange(this.filters);
        }
    }

    filterToggle = e => {
        const {target} = e;
        const {name, checked} = target;
        this.filters[name] = checked;
        this.updateFilters();
    }

    render() {
        return <div className="block">
            <h3>Фильтр</h3>
            <div><input name={'cheaper'} checked={this.props.filter.cheaper} type={'checkbox'} onChange={this.filterToggle}/> <a title={'Облигации дешевле номинала'} href={'/cheaper'}>Дешевле номинала</a></div>
            <div><input name={'cheaper3'} checked={this.props.filter.cheaper3} type={'checkbox'} onChange={this.filterToggle}/> Дешевле 1.03 номинала</div>
            <div><input name={'monthly'} checked={this.props.filter.monthly} type={'checkbox'} onChange={this.filterToggle}/> Выплата в течении месяца</div>
            {/*<h3>Сортировка</h3>*/}
        </div>

    }
}

export default BondsFilter;