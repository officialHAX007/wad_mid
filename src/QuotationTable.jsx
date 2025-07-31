import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, IconButton, Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  const totalAmount = data.reduce((sum, d) => sum + (d.qty * d.ppu - d.discount), 0);
  const totalDiscount = data.reduce((sum, d) => sum + d.discount, 0);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Quotation
      </Typography>
      <Button variant="outlined" color="error" onClick={clearAll} sx={{ mb: 2 }}>
        Clear
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Price/Unit</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={i}>
              <TableCell>
                <IconButton color="error" onClick={() => deleteByIndex(i)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>{d.qty}</TableCell>
              <TableCell>{d.item}</TableCell>
              <TableCell>{d.ppu.toFixed(2)}</TableCell>
              <TableCell>{d.discount.toFixed(2)}</TableCell>
              <TableCell>{(d.qty * d.ppu - d.discount).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right"><strong>Total Discount</strong></TableCell>
            <TableCell colSpan={1}><strong>{totalDiscount.toFixed(2)}</strong></TableCell>
            <TableCell><strong>{totalAmount.toFixed(2)}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default QuotationTable;
