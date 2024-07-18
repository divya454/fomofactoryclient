import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';

function Table() {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = useState();
    const [names, setnames] = useState([]);

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Symbol',
            selector: (row) => row.symbol,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Image',
            selector: (row) => row.image,
            sortable: true,
        },
        {
            name: 'Current Price',
            selector: (row) => row.current_price,
            sortable: true,
        },
        {
            name: 'Market Cap',
            selector: (row) => row.market_cap,
            sortable: true,
        },
        {
            name: 'Market Cap Rank',
            selector: (row) => row.market_cap_rank,
            sortable: true,
        },
        {
            name: 'Fully Diluted Valuation',
            selector: (row) => row.fully_diluted_valuation,
            sortable: true,
        },
        {
            name: 'Total Volume',
            selector: (row) => row.total_volume,
            sortable: true,
        },
        {
            name: 'High_24h',
            selector: (row) => row.high_24h,
            sortable: true,
        },
        {
            name: 'Low_24h',
            selector: (row) => row.Low_24h,
            sortable: true,
        },
        {
            name: 'Price Change_24h',
            selector: (row) => row.price_change_24h,
            sortable: true,
        },
        {
            name: 'Price Change Prcentage_24h',
            selector: (row) => row.price_change_percentage_24h,
            sortable: true,
        },
        {
            name: 'Market Cap Change_24h',
            selector: (row) => row.market_cap_change_24h,
            sortable: true,
        },
        {
            name: 'Market Cap Change Percentage_24h',
            selector: (row) => row.market_cap_change_percentage_24h,
            sortable: true,
        },
        {
            name: 'Circulating Supply',
            selector: (row) => row.circulating_supply,
            sortable: true,
        },
        {
            name: 'Total Supply',
            selector: (row) => row.total_supply,
            sortable: true,
        },
        {
            name: 'Max Supply',
            selector: (row) => row.max_supply,
            sortable: true,
        },
        {
            name: 'Ath',
            selector: (row) => row.ath,
            sortable: true,
        },
        {
            name: 'Ath Change Percentage',
            selector: (row) => row.ath_change_percentage,
            sortable: true,
        },
        {
            name: 'Ath Date',
            selector: (row) => row.ath_date,
            sortable: true,
        },
        {
            name: 'Atl',
            selector: (row) => row.atl,
            sortable: true,
        },
        {
            name: 'Atl Change Percentage',
            selector: (row) => row.atl_change_percentage,
            sortable: true,
        },
        {
            name: 'Roi',
            selector: (row) => row.roi,
            sortable: true,
        },
        {
            name: 'Last Updated',
            selector: (row) => row.last_updated,
            sortable: true,
        },
    ];
    const [rows, setRows] = useState([]);
    const [error, setError] = useState('');

    const [data, setData] = useState(rows);
    const fetchData = async () => {
        try {
            const response = await fetch(' http://localhost:8000/api/getstocks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            const pageSize = 25;
const page = 1;
setData(result);
const pageData = result.slice((page * pageSize) - pageSize, page * pageSize);
           setRows(pageData);
            const val = [...new Set(result.map(q => q.name))];
            setnames(val)
        } catch (error) {
            setError(error.message);
        } finally {

        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setInterval(fetchData, 100000); // The function will be called
    }, []);
    // definition of the rows constant

    const handleSelect = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        setIsOpen(false);
        const results = data.filter(person => person.name === value)
        setRows(results)
        // onSelect(value);
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    // Handle Search
    // const handleSearch = (e) => {
    //     let searchValue: Boolean;
    //     let personIDValue: Boolean;
    //     let fullNameValue: Boolean;
    //     let heightValue: Boolean;
    //     let eyeColorValue: Boolean;

    //     const newRows = rows.filter((row) => {
    //       personIDValue = row.personID
    //         .toString()
    //         .toLowerCase()
    //         .includes(e.target.value.toLowerCase());
    //       fullNameValue = row.fullName
    //         .toLowerCase()
    //         .includes(e.target.value.toLowerCase());
    //       heightValue = row.height
    //         .toLowerCase()
    //         .includes(e.target.value.toLowerCase());
    //       eyeColorValue = row.eyeColor
    //         .toLowerCase()
    //         .includes(e.target.value.toLowerCase());

    //       if (personIDValue) {
    //         searchValue = personIDValue;
    //       } else if (fullNameValue) {
    //         searchValue = fullNameValue;
    //       } else if (heightValue) {
    //         searchValue = heightValue;
    //       } else {
    //         searchValue = eyeColorValue;
    //       }

    //       return searchValue;
    //     });

    //     setData(newRows);
    // };
    return (
        <>
            {/* <input
   type="search"
   className="form-control-sm border ps-3"
   placeholder="Search"
   onChange={handleSearch}
/> */}

            <div className="container">
                <div>
                    <button onClick={openModal}>Open Modal</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Select Crypto</h2>
                        <select value={selectedOption} onChange={handleSelect}>
                            {names&&names.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button onClick={closeModal}>close</button>
                    </Modal>
                </div>

                <DataTable
                    columns={columns}
                    data={rows}
                    fixedHeader
                    title="Real-Time-Crypto-Data"
                    pagination
                    selectableRows
                />

            </div>
        </>
    );
}
export default Table;