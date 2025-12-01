import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //implement the get products function
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/products`);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError('Failed to delete the product. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Product List
      </Typography>

      {error && (
        <Box
          sx={{
            bgcolor: '#fdecea',
            color: '#611a15',
            p: 2,
            borderRadius: 1,
            textAlign: 'center',
            mb: 2,
          }}
        >
          {error}
        </Box>
      )}

      {loading ? (
        <Typography align="center">Loading products...</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center">No products available.</Typography>
            </Grid>
          ) : (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(product.id)}
                    sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" fontWeight={700}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;
