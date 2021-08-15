import React, { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { literacyFetch } from '../../Redux/actions/chartsAction';
import { FadeTransform } from 'react-animation-components';
import './styles.css';
const Literacy = () => {
    const dispatch = useDispatch()
    const Record = useSelector((state) => state.chartsData)
    useEffect(() => {
        dispatch((literacyFetch()));
    }, [])
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <Card.Title className="text-center mt-3"><h2 className="heads">Literacy from last 5 Surveys.</h2></Card.Title>
                <Card.Body className="">
                    <Line
                        data={{
                            labels: Record.litYears,
                            datasets: [
                                {
                                    data: Record.litMenCount,
                                    label: 'Men',
                                    borderColor: '#3333ff',
                                    fill: true,

                                },
                                {
                                    data: Record.litWomenCount,
                                    label: 'women',
                                    borderColor: '#ec0101',
                                    fill: true,

                                }],
                        }}
                    />
                </Card.Body>
            </Card>
        </FadeTransform>
    );
}

export default Literacy;