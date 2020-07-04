const Tinkoff = () => {
    return <div onClick={() => window.open('https://www.tinkoff.ru/sl/9nMXWP1hGXP')} className={'tinkoff'}>
        <div className={'img-wrapper'}><img src={'/tinkoff.svg'} /></div>
        <div className={'text-wrapper'}>Месяц бесплатной торговли и кардхолдер в подарок</div>
    </div>
}

export default Tinkoff;