import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import HanziQuiz from './components/HanziQuiz/HanziQuiz';
import AddHanziForm from './components/HanziQuiz/AddHanziForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const hanzis = [{
    pinyin: 'hǎo',
    imageUrl: 'images/hanzis/hao.gif',
    imageSource: "Written Chinese",
    hungarianMeanings: ['jó (hǎo)']
},
    {
        pinyin: 'bái',
        imageUrl: 'images/hanzis/bai1.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['fehér (bái)']
    },
    {
        pinyin: 'bǎi',
        imageUrl: 'images/hanzis/bai2.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['száz (bǎi)', 'számos (bǎi)']
    },
    {
        pinyin: 'bǐ',
        imageUrl: 'images/hanzis/bi.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['összehasonlít (bǐ)']
    },
    {
        pinyin: 'bié',
        imageUrl: 'images/hanzis/bie.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['nem szabad (bié)', 'nem kell (bié)', 'tilos (bié)']
    },
    {
        pinyin: 'cháng',
        imageUrl: 'images/hanzis/chang.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['hosszú (cháng)', 'gyakran (cháng)', 'mindig (cháng)']
    },
    {
        pinyin: 'chū',
        imageUrl: 'images/hanzis/chu.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['kimegy (chū)', 'kijön (chū)']
    },
    {
        pinyin: 'chuān',
        imageUrl: 'images/hanzis/chuan.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['visel (chuān)', 'hord (chuān)', 'öltözik (chuān)']
    },
    {
        pinyin: 'cì',
        imageUrl: 'images/hanzis/ci.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['-szor, -ször (cì)']
    },
    {
        pinyin: 'cóng',
        imageUrl: 'images/hanzis/cong.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['-ból, ből (cóng)', 'követ vkit (cóng)']
    },

    {
        pinyin: 'cuò',
        imageUrl: 'images/hanzis/cuo.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['hiba (cuò)', 'helytelen (cuò)']
    },
    {
        pinyin: 'dào',
        imageUrl: 'images/hanzis/dao.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['-ba, -be, -ig (dào)', 'megérkezik (dào)']
    },
    {
        pinyin: 'děng',
        imageUrl: 'images/hanzis/deng.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['vár vkire (děng)', 'stb (děng)']
    },
    {
        pinyin: 'dǒng',
        imageUrl: 'images/hanzis/dong.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['megért, felfog (dǒng)']
    },
    {
        pinyin: 'gāo',
        imageUrl: 'images/hanzis/gao.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['magas (gāo)', 'hangos (gāo)']
    },

    {
        pinyin: 'gěi',
        imageUrl: 'images/hanzis/gei.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['ad (gěi)']
    },
    {
        pinyin: 'guì',
        imageUrl: 'images/hanzis/gui.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['drága (guì)']
    },
    {
        pinyin: 'guò',
        imageUrl: 'images/hanzis/guo.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['időt tölt (guò)']
    },
    {
        pinyin: 'hái',
        imageUrl: 'images/hanzis/hai.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['még ... is (hái)']
    },
    {
        pinyin: 'hēi',
        imageUrl: 'images/hanzis/hei.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['fekete (hēi)']
    },
    {
        pinyin: 'hóng',
        imageUrl: 'images/hanzis/hong.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['piros (hóng)']
    },
    {
        pinyin: 'jiàn',
        imageUrl: 'images/hanzis/jian.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['darab -ruha (jiàn)']
    },
    {
        pinyin: 'jìn',
        imageUrl: 'images/hanzis/jin.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['belép (jìn)']
    },
    {
        pinyin: 'jiù',
        imageUrl: 'images/hanzis/jiu.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['éppen (jiù)', 'amint (jiù)']
    },
    {
        pinyin: 'kè',
        imageUrl: 'images/hanzis/ke.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['lecke (kè)', 'tanóra (kè)']
    },
    {
        pinyin: 'kuài',
        imageUrl: 'images/hanzis/kuai.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['gyorsan (kuài)']
    },
    {
        pinyin: 'lèi',
        imageUrl: 'images/hanzis/lei.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['fáradt (lèi)']
    },
    {
        pinyin: 'lí',
        imageUrl: 'images/hanzis/li.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['-tól, -től (lí)']
    },
    {
        pinyin: 'liǎng',
        imageUrl: 'images/hanzis/liang.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['kettő (liǎng)']
    },{
        pinyin: 'líng',
        imageUrl: 'images/hanzis/ling.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['nulla (líng)']
    },{
        pinyin: 'lù',
        imageUrl: 'images/hanzis/lu.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['út (lù)']
    },{
        pinyin: 'mài',
        imageUrl: 'images/hanzis/mai.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['elad (mài)']
    },{
        pinyin: 'màn',
        imageUrl: 'images/hanzis/man.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['lassú (màn)']
    },
    {
        pinyin: 'máng',
        imageUrl: 'images/hanzis/mang.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['elfoglalt (máng)']
    },
    {
        pinyin: 'měi',
        imageUrl: 'images/hanzis/mei.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['minden egyes (měi)']
    },
    {
        pinyin: 'mén',
        imageUrl: 'images/hanzis/men.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['ajtó (mén)']
    },
    {
        pinyin: 'nán',
        imageUrl: 'images/hanzis/nan.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['hím (nán)']
    },
    {
        pinyin: 'nín',
        imageUrl: 'images/hanzis/nin.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['Ön (nín)']
    },
    {
        pinyin: 'nǚ',
        imageUrl: 'images/hanzis/nu.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['nő (nǚ)']
    },
    {
        pinyin: 'piào',
        imageUrl: 'images/hanzis/piao.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['jegy (piào)']
    },
    {
        pinyin: 'qiān',
        imageUrl: 'images/hanzis/qian.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['ezer (qiān)']
    },
    {
        pinyin: 'qíng',
        imageUrl: 'images/hanzis/qing.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['szép idő (qíng)']
    },
    {
        pinyin: 'ràng',
        imageUrl: 'images/hanzis/rang.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['-tat, -tet (ràng)']
    },
    {
        pinyin: 'rì',
        imageUrl: 'images/hanzis/ri.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['nap (rì)']
    },
    {
        pinyin: 'sòng',
        imageUrl: 'images/hanzis/song.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['ajándékba ad (sòng)']
    },
    {
        pinyin: 'tā',
        imageUrl: 'images/hanzis/ta.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['az -tárgy (tā)']
    },
    {
        pinyin: 'tí',
        imageUrl: 'images/hanzis/ti.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['kérdés (tí)']
    },
    {
        pinyin: 'wài',
        imageUrl: 'images/hanzis/wai.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['kint (wài)', 'külföldi (wài)']
    },
    {
        pinyin: 'wán',
        imageUrl: 'images/hanzis/wan.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['befejez (wán)']
    },
    {
        pinyin: 'wán',
        imageUrl: 'images/hanzis/wan1.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['játszik (wán)']
    },
    {
        pinyin: 'wǎng',
        imageUrl: 'images/hanzis/wang.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['vmi felé (wǎng)']
    },
    {
        pinyin: 'wèn',
        imageUrl: 'images/hanzis/wen.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['kérdez (wèn)']
    },
    {
        pinyin: 'xǐ',
        imageUrl: 'images/hanzis/xi.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['mosakszik (xǐ)']
    },
    {
        pinyin: 'xiào',
        imageUrl: 'images/hanzis/xiao.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['nevet (xiào)']
    },
    {
        pinyin: 'xīn',
        imageUrl: 'images/hanzis/xin.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['új (xīn)']
    },
    {
        pinyin: 'xìng',
        imageUrl: 'images/hanzis/xing.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['családnév (xìng)']
    },
    {
        pinyin: 'xuě',
        imageUrl: 'images/hanzis/xue.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['hó (xuě)']
    },
    {
        pinyin: 'yào',
        imageUrl: 'images/hanzis/yao.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['gyógyszer (yào)']
    },
    {
        pinyin: 'yào',
        imageUrl: 'images/hanzis/yao1.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['akar (yào)']
    },
    {
        pinyin: 'yě',
        imageUrl: 'images/hanzis/ye.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['is (yě)']
    },
    {
        pinyin: 'yīn',
        imageUrl: 'images/hanzis/yin.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['felhős (yīn)']
    },
    {
        pinyin: 'yú',
        imageUrl: 'images/hanzis/yu.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['hal (yú)']
    },
    {
        pinyin: 'yuǎn',
        imageUrl: 'images/hanzis/yuan.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['messzi (yuǎn)']
    },
    {
        pinyin: 'zài',
        imageUrl: 'images/hanzis/zai.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['még egyszer (zài)']
    }, {
        pinyin: 'zhǎo',
        imageUrl: 'images/hanzis/zhao.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['keres (zhǎo)']
    },
    {
        pinyin: 'zhe',
        imageUrl: 'images/hanzis/zhe.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['folyamatot jelöl (zhe)']
    },
    {
        pinyin: 'zhēn',
        imageUrl: 'images/hanzis/zhen.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['igazán (zhēn)']
    },
    {
        pinyin: 'zǒu',
        imageUrl: 'images/hanzis/zou.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['sétál, megy (zǒu)']
    },
    {
        pinyin: 'zuì',
        imageUrl: 'images/hanzis/zui.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['leg- (zuì)']
    },
    {
        pinyin: 'duì',
        imageUrl: 'images/hanzis/dui.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['helyes (duì)']
    },
    {
        pinyin: 'dé',
        imageUrl: 'images/hanzis/de2.gif',
        imageSource: "Written Chinese",
        hungarianMeanings: ['birtokviszony (dé)']
    }
];

function getTurnData(hanzis) {
    const allHungarians = hanzis.reduce(function(p, c, i) {
        return p.concat(c.hungarianMeanings);
    }, []);
    const fourRandomMeanings = shuffle(allHungarians).slice(0,4);
    const answer = sample(fourRandomMeanings);

    return {
        hungarianMeanings: fourRandomMeanings,
        hanzi: hanzis.find((hanzi) =>
            hanzi.hungarianMeanings.some((meaning) =>
                meaning === answer))
    };
}

function reducer(state = { hanzis, turnData:getTurnData(hanzis), highlight: ''},
                 action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.hanzi.hungarianMeanings.some((meaning) => meaning === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, {highlight: '', turnData: getTurnData(state.hanzis)});
        case 'ADD_HANZI':
            return Object.assign({}, state, {
                hanzis: state.hanzis.concat([action.hanzi])
            });
        default:
            return state;
    }
    return state;
}

let store = Redux.createStore(reducer);

ReactDOM.render(<BrowserRouter>
    <div>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={HanziQuiz}/>
                <Route exact path="/add" component={AddHanziForm}/>
            </React.Fragment>
        </ReactRedux.Provider>;
    </div>
</BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
