const express = require('express');
const router=express.Router();
const axios = require('axios');

router.get('/categories/:categoryname/products', async(req, res) => {
    const { categoryname } = req.params;
    const { n, page, sort_by, sort_order, minPrice, maxPrice } = req.query;
  
    const api="http://20.244.56.144/test"

    try {
      if (!categoryname) {
        return res.status(400).json({ error: 'Category name is required.' });
      }
      if (!n || isNaN(parseInt(n)) || parseInt(n) <= 0) {
        return res.status(400).json({ error: 'Parameter "n" must be a positive integer.' });
      }
  
      const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
      const requests = companies.map(company => {
        const url = `${api}/companies/${company}/categories/${categoryname}/products/top-${n}`;
        const params = { minPrice, maxPrice };
        return axios.get(url, { params });
      });

      const responses = await Promise.all(requests);
  
      let combinedProducts = [];
      responses.forEach(response => {
        combinedProducts = combinedProducts.concat(response.data.products);
      });
  
      if (sort_by && sort_order) {
        combinedProducts.sort((a, b) => {
          const keyA = a[sort_by];
          const keyB = b[sort_by];
          const order = sort_order === 'asc' ? 1 : -1;
          if (keyA < keyB) return -order;
          if (keyA > keyB) return order;
          return 0;
        });
      }
  
      let paginatedProducts = combinedProducts.slice(0, n);
      if (page && parseInt(page) > 1) {
        const startIndex = (parseInt(page) - 1) * n;
        paginatedProducts = combinedProducts.slice(startIndex, startIndex + parseInt(n));
      }
  
      paginatedProducts.forEach((product, index) => {
        product.id = `${categoryname}-${index + 1}`;
      });
  
      res.json(paginatedProducts);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

module.exports=router
  