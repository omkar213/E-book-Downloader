Admin .js 

# prev
<Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
</Routes>

# my change
<Routes>
          <Route path="home" element={""} />
          <Route path="all-pdfs" element={""} />
          <Route path="add-pdf/:id" element={""} />
          <Route path="downloads" element={""} />
          <Route path="download-details/:id" element={""} />
</Routes>