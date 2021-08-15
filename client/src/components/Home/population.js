import React,{useEffect} from "react";
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {populationFetch} from '../../Redux/actions/chartsAction';
import { FadeTransform } from 'react-animation-components';
import "./styles.css"

const Population = () => {
    const dispatch=useDispatch()
    const Record=useSelector((state)=>state.chartsData)
    useEffect(()=>{
            dispatch((populationFetch()));  
    },[])
    const data = {
        labels: Record.popYears,
        datasets: [
            {
                label: "Men",
                data: Record.popMenCount,
                backgroundColor: "#944e6c"
            },
            {
                label: "Women",
                data: Record.popWomenCount,
                backgroundColor: "#111d5e"
            },
            {
                label: "Children",
                data: Record.popChildrenCount,
                backgroundColor: "#c70039"
            }
        ]
    }
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <Card className="col-md-11">
            <Card.Title className="text-center mt-3"><h2 className="heads">Population from last 5 Surveys.</h2></Card.Title>
            <Card.Body className="mt-2">
                <Bar
                    data={data}
                    options={
                        {
                            tooltips: { mode: "index" },
                        }
                    } />
            </Card.Body>
        </Card>
        </FadeTransform>
    );
}

export default Population;