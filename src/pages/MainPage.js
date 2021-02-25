/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import MenuAppBar from "./AppBar";
import { CircularProgress, Typography } from '@material-ui/core';

export const MainPage = (props) => {
    const [state, setState] = useState({isLoading: true});

    useEffect(() => {
        getPeoplePage(1);
    }, []);

    const getPeoplePage = (page) => {
        axios.get('https://swapi.dev/api/people?page=' + page)
        .then((res) => {
            const users = { results: [], count: res.data.count};
            res.data.results.map((user) => {
                axios.get(user.homeworld, { mode: 'no-cors' })
                .then((res) => {
                    user.homeworld = res.data.name;
                    users.results.push(user);
                })
            })
            setTimeout(() => setState({results: res.data.results, count: res.data.count}), 3500);
        })        
    }

    const changePage = (page) => {
        setState({isLoading: true});
        axios.get('https://swapi.dev/api/people?page=' + page)
        .then((res) => {
            const users = { results: [], count: res.data.count};
            res.data.results.map((user) => {
                axios.get(user.homeworld, { mode: 'no-cors' })
                .then((res) => {
                    user.homeworld = res.data.name;
                    users.results.push(user);
                })
            })
            setTimeout(() => setState({results: res.data.results, count: res.data.count}), 3500);
        })
      };
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
          display: false,
         }
        },
        {
         name: "mass",
         label: "Mass",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "hair_color",
         label: "Hair",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "skin_color",
         label: "Skin",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "eye_color",
         label: "Eye",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "birth_year",
         label: "Date of birth",
         options: {
          filter: true,
          sort: false,
          display: false,
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
         label: "Homeworld",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "vehicles",
         label: "Vehicles",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        },
        {
         name: "films",
         label: "Films",
         options: {
          filter: true,
          sort: false,
          display: false,
         }
        }
       ];
       
       const options = {
        searchBox: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        serverSide: true,
        count: state.count,
        onTableChange: (action, tableState) => {
            switch (action) {
              case 'changePage':
                changePage(tableState.page + 1);
                break;
              default:
                console.log('action not handled.');
            }
          },
        onRowClick: (rowData) => {
            props.history.push(`/profile?name=${rowData[0]}&height=${rowData[1]}&mass=${rowData[2]}&hair=${rowData[3]}&skin=${rowData[4]}&eye=${rowData[5]}&birth=${rowData[6]}&gender=${rowData[7]}&home=${rowData[8]}&vehicles=${rowData[9]}&films=${rowData[10]}`);
            
        }
       };

    return (
        <div>            
            <MenuAppBar />
            <div style={{width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px'}}>
            <MUIDataTable
                title={
                <Typography variant="h6">
                    People list
                    {state.isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                </Typography>
                }
                data={state.results}
                columns={columns}
                options={options}                
            />
            </div>
            
        </div>
    )
}