import React, { useState, useEffect } from 'react';

import { FaChartBar, FaRegClipboard } from 'react-icons/fa';

import { Line } from 'react-chartjs-2';

import './styles.css'

import api from '../../services/api';


// import logoImg from '../../assets/logo1.png'
import dogImg from '../../assets/dog.png'

export default function Principal() {
  const [isTableActive, setIsTableActive] = useState(true);
  const [isChartActive, setIsChartActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0)
  const [totalKg, setTotalKg] = useState(0)
  let moneyTotal = 0;
  let kgTotal = 0;

  useEffect(() => {

    api.get('products')
      .then(res => {
        
        setProducts(res.data.docs);

        for (let i = 0; i < res.data.total; i++) {
          moneyTotal += res.data.docs[i].price;
          kgTotal += res.data.docs[i].description;
        }

        setTotal(moneyTotal);
        setTotalKg(kgTotal);

      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  return (
    <div className="container">
      <section className="left-section">
        <img src={dogImg} alt='dog' />

        <h1> Z E U S </h1>
      </section>

      <section className="right-section">

        <div className="buttons-div">
          <button
            onClick={() => {
              setIsTableActive(true)
              setIsChartActive(false)
            }}>
            <FaRegClipboard size={30} color={isTableActive ? "#F0BC5E" : ""} />
          </button>

          {/* function handleChart () {
           setIsChartActive(true)
          } */}
          <button
            onClick={() => {
              setIsTableActive(false)
              setIsChartActive(true)
            }}>

            <FaChartBar size={30} color={isChartActive ? "#F0BC5E" : ""} />
          </button>

        </div>

          <div className="body">
            {isChartActive &&

              <div>
                <Line id="grafic-div"
                  width={400}
                  height={300}
                  data={{
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],


                    
                
                  }}
                />
              </div>

            }
            {isTableActive && (
              <>
                <div className="month-filter-div">

                  <select>
                    <option hidden>Filtrar por mês</option>
                    <option>Janeiro 2021</option>
                    <option>Fevereiro 2021</option>
                    <option>Março 2021</option>
                  </select>

                  <button>Filtrar</button>

                </div>

                <div id="card">
                  <div>
                    <p id="total">Despesa total </p>
                    <p id="value1">R$ {total}</p>
                  </div>
                  <div>
                    <p id="total"> Total de Ração</p>
                    <p id="value1">{totalKg} kg</p>
                  </div>

                </div>


                <section id="scroll-table">
                  <table id="data-table">
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Peso</th>
                        <th>Valor</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>



                      {products.map(product => (
                        <tr key={product._id}>
                          <td className="title">{product.title}</td>
                          <td className="description">{product.description}kg</td>
                          <td className="price">R${product.price}</td>
                          <td className="date">{product.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}

          </div>
      </section>

    </div >
  );
}