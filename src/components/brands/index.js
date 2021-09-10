import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS_LIST } from './Brand.gql';
import defaultClass from './Brand.css';
import { useEffect } from 'react';

const Brands = props => {
    // const [character, setCharecter] = useState([])
    const {
        data: brandsData,
        loading: brandsLoading,
        error: brandsError
    } = useQuery(GET_BRANDS_LIST, {
        variables: {
            pageSize: 99999,
            currentPage: 1
        }
    });
    
    const {
        mpbrand: { items }
    } = brandsData;

    const name = items.map((item)=> {
        return item.default_value
    })

    // let char = name.map((i)=> {
    //     console.log(i.charAt(0));
    //     return i.charAt(0);
    // })
 
    let charac = name.map((e)=> {
        let temp = []
        temp.push(e.charAt(0))
        return temp.join("")
        
    })
    charac = Array.from(new Set(charac))
    
    // console.log(charac);

    
    // console.log(items, name);
    const classes = defaultClass
    const [brands, setBrands] = useState(items)
    const [active, setActive] = useState(0)
    const [value, setValue] = useState("")


    // console.log(value);

    
    const filterByChar = (char,index)=> {
        if( char!=="all") {
            let temp = items.filter((brand)=> {
                return brand.default_value.startsWith(char)
            })
            setBrands(temp)
            setActive(index)
        } else {

            setBrands(items)
        }


    }


    const updateSearch = (e)=> {    
        setValue(e.target.value)
    }

    useEffect(()=> {
        let temp = items.filter((brand)=> {
            return brand.default_value.toLowerCase().startsWith(value)
        })
        setBrands(temp)
    },[value])
    



        
    return (
        <section className= {classes.section}>
        <div className={classes.header}>
            <div className={classes.title}>
                <p>Brands List</p>
            </div>
            <div className={classes.form}>
                <input value={value} onChange={(e)=>updateSearch(e)} className={classes.searchBox} type="text" placeholder="Search something..." />
            </div>
        </div>
        <div className={classes.menu}>
            <div className={classes.btnContainer}>
            <button className={`${classes.btn} active`} onClick={()=> filterByChar("all")}>All</button>
            {charac.map((c,index)=> {
                return <button className={`${active===index ? classes.activeBtn: classes.btn }`} onClick={()=> filterByChar(c,index)}>{c}</button>
            })}
            </div>
        </div>
        <div className={classes.container}>
            {brands.map((item, index) => (
                <img className={classes.image} key={index} src={item.image} alt="logo" />
                ))}
        </div>
        </section>
    );
};

export default Brands;
