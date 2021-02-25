/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { CircularProgress, Typography } from '@material-ui/core';
import MenuAppBar from "./AppBar";

export const AllPeople = (props) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        getAllPeople();
    }, []);

    const getAllPeople = () => {
        for (let index = 1; index < 10; index++) {
            axios.get('https://swapi.dev/api/people?page=' + index)
            .then((res) => {
                res.data.results.map((user) => {
                    setState(state => 
                       [...state, user]
                    ); 
                })
            })
        }
    }

    const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
          display: true,
         }
        },
        {
         name: "height",
         label: "Height",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "mass",
         label: "Mass",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "hair_color",
         label: "Hair",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "skin_color",
         label: "Skin",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "eye_color",
         label: "Eye",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "birth_year",
         label: "Date of birth",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "gender",
         label: "Gender",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "homeworld",
         label: "homeworld",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "vehicles",
         label: "vehicles",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "films",
         label: "films",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
       ];
       
       const options = {
        filterType: 'dropdown',
        rowsPerPage: 100,
        onRowClick: (rowData) => {
            props.history.push(`/profile?name=${rowData[0]}&height=${rowData[1]}&mass=${rowData[2]}&hair=${rowData[3]}&skin=${rowData[4]}&eye=${rowData[5]}&birth=${rowData[6]}&gender=${rowData[7]}&home=${rowData[8]}&vehicles=${rowData[9]}&films=${rowData[10]}`);
            
        }
       };
    
    return (
        <div>
            <MenuAppBar />
            <div style={{width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px'}}>
                <MUIDataTable
                    title={<Typography variant="h6">
                        All People list
                        {state.length !== 82 && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4   }} />}
                    </Typography>}
                    data={state.length !== 82 ? [] : state}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
}