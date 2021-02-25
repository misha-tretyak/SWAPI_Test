/* eslint-disable array-callback-return */
import React from 'react';
import MUIDataTable from "mui-datatables";
import MenuAppBar from "./AppBar";

export const LikedList = (props) => {

    const likedList = JSON.parse(localStorage.getItem('likedList'));
    


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
         name: "hair",
         label: "Hair",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "skin",
         label: "Skin",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "eye",
         label: "Eye",
         options: {
          filter: true,
          sort: false,
          display: true,
         }
        },
        {
         name: "birth",
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
         name: "home",
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
        filterType: 'dropdown',
        responsive: 'vertical',
        onRowClick: (rowData) => {
            props.history.push(`/profile?name=${rowData[0]}&height=${rowData[1]}&mass=${rowData[2]}&hair=${rowData[3]}&skin=${rowData[4]}&eye=${rowData[5]}&birth=${rowData[6]}&gender=${rowData[7]}&home=${rowData[8]}&vehicles=${rowData[9]}&films=${rowData[10]}`);
            
        }
       };

    return (
        <div>
            <MenuAppBar />
            <div style={{width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px'}}>
                <MUIDataTable
                    title='Liked list'
                    data={likedList}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
}