import { useEffect, useRef, useState } from "react";
import {
  Container, Grid, TextField, Button,
  Select, MenuItem, InputLabel, FormControl, Typography
} from "@mui/material";
import QuotationTable from "./QuotationTable";

function App() {
  const itemRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [products, setProducts] = useState([]);
  const [ppu, setPpu] = useState(0);
  const [dataItems, setDataItems] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");

  // Fetch products.json on load
  useEffect(() => {
    fetch("/wad_mid/products.json")
 // <-- important for GitHub Pages
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          setSelectedCode(data[0].code);
          setPpu(data[0].price);
        }
      });
  }, []);

  // Add item to list
  const addItem = () => {
    const selected = products.find((p) => p.code === itemRef.current.value);
    const qty = parseInt(qtyRef.current.value);
    const discount = parseFloat(discountRef.current.value || 0);
    const price = parseFloat(ppu);

    const newItem = { item: selected.name, qty, ppu: price, discount };

    let merged = false;
    const updated = dataItems.map((d) => {
      if (d.item === newItem.item && d.ppu === newItem.ppu) {
        merged = true;
        return {
          ...d,
          qty: d.qty + newItem.qty,
          discount: d.discount + newItem.discount
        };
      }
      return d;
    });

    if (merged) {
      setDataItems(updated);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (idx) => {
    const copy = [...dataItems];
    copy.splice(idx, 1);
    setDataItems(copy);
  };

  const clearAll = () => setDataItems([]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Quotation Generator
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Item</InputLabel>
            <Select
              inputRef={itemRef}
              value={selectedCode}
              label="Item"
              onChange={(e) => {
                setSelectedCode(e.target.value);
                const selected = products.find((p) => p.code === e.target.value);
                if (selected) setPpu(selected.price);
              }}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Price per Unit"
            type="number"
            value={ppu}
            onChange={(e) => setPpu(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            defaultValue={1}
            inputRef={qtyRef}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Discount"
            type="number"
            defaultValue={0}
            inputRef={discountRef}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" fullWidth onClick={addItem}>
            Add
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
