import "./products.css"
import React from "react";
import Product from "../product/Product";
import DiningIcon from '@mui/icons-material/Dining';
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import _ from "lodash";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from "@mui/material";

export const Products = () => {
    const [filterData, setFilterData] = useState([]);
    const [resturent, setResturent] = useState([]);
    const [state, setState] = React.useState({
        right: false,
    });
    const [stateres, setStateres] = React.useState({
        biriyani: false,
        cake: false,
        icecream: false,
        bengalithali: false,
    });



    useEffect(() => {
        const getResturents = async () => {
            try {
                const res = await userRequest.get("/resturents");
                setFilterData(res.data);
                setResturent(res.data);
            } catch (err) {
                console.log(err);
            }
        }; getResturents();
    }, [])



    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    const handleChange = async (params) => {
        try {
            const res = await userRequest.get(`/resturents?category=${params}`);
            setFilterData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeres = (event) => {
        setStateres({
            ...stateres,
            [event.target.name]: event.target.checked,
        });
    };

    const SearchItemFilter = () => {
        let allFilter = []
        Object.filter = (obj, predicate) =>
            Object.fromEntries(Object.entries(obj).filter(predicate));

        var filtered = Object.filter(stateres, ([name, value]) => value === true);
        for (let i in filtered) {
            allFilter.push(i)
        }
    }

    const { biriyani, cake, icecream, bengalithali } = stateres;

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List sx={{ padding: "10px", alignItems: "center", display: "flex", flexDirection: "column" }}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Filter State</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={biriyani} onChange={handleChangeres} name="biriyani" />
                            }
                            label="Biriyani"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={cake} onChange={handleChangeres} name="cake" />
                            }
                            label="Cake"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={icecream} onChange={handleChangeres} name="icecream" />
                            }
                            label="Icecream"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={bengalithali} onChange={handleChangeres} name="bengalithali" />
                            }
                            label="Bengali-Thali"
                        />
                    </FormGroup>
                    <Button variant="contained" color="primary" onClick={() => SearchItemFilter()} >Share</Button>
                    <FormHelperText>Happy foody</FormHelperText>
                </FormControl>
            </List>
        </Box>
    );



    return <div className='app__darkbg app__wrapper section__padding'>
        <div className='app__products-wrapper'>
            <div className='app__products-wrapper-top'>
                <div className='app__products-wrapper_text'>
                    <h1 className='headtext_cormorent'>Our Services</h1>
                </div>
                <div className='app__products-wrapper_options'>
                    <a onClick={() => handleChange('revelance')}>Revelance</a>
                    <a onClick={() => handleChange('delivery')}>Delivery</a>
                    <a onClick={() => handleChange('rating')}>Rating</a>
                    <div className="sortSection" onClick={toggleDrawer('right', true)}>
                        <button className="sort" >Filter</button>
                        <DiningIcon />
                    </div>

                </div>

                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </div>

            <div className='app__products-wrapper-bottom'>
                {filterData.map((res) => (
                    <Product item={res} />
                ))}

            </div>

        </div>
    </div>;
};
export default Products;
