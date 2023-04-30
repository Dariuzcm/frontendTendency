import { useEffect, useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAllOrders } from './orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { CircularProgress, Pagination } from '@mui/material';

function Row(props: { row: any }) {
  const { row } = props
  const [open, setOpen] = useState(false);
  const { items } = row
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.items.length}</TableCell>
        <TableCell align="right">{row.totals.tax}</TableCell>
        <TableCell align="right">{row.totals.discount}</TableCell>
        <TableCell align="right">{row.totals.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table style={{marginLeft: "3rem", marginRight:"3rem"}}>
                <TableHead>
                  <TableCell>Sku</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableHead>
                <TableBody>
                  {items.map((item:any) => {
                    return (
                      <TableRow>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function CollapsibleTable() {
  const dispatch = useDispatch<any>();
  const { orders, loading } = useSelector((state: RootState) => state.orders)
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [rows, setRows] = useState<any[]>(paginate(10, 1))

  useEffect(() => {
    dispatch(getAllOrders())
  }, [])
  useEffect(() => setRows(paginate(10, 1)), [orders])

  function paginate(page_size:number=10, page_number:number=1) {
    return orders.slice((page_number - 1) * page_size, page_number * page_size);
  }
  const handleOnChangePagination = (_: React.ChangeEvent<unknown>, page: number) => {
    setSelectedPage(page)
    setRows(paginate(10, page))
  }

  return (
    <>

      <TableContainer component={Paper}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell size='medium' >
                { loading && <Box sx={{ display: 'flex', width: '50%' }}>
                  <CircularProgress size={20}/>
                </Box>}
              </TableCell>
              <TableCell size='medium'>ID</TableCell>
              <TableCell size='medium' align="right">Order</TableCell>
              <TableCell size='medium' align="right">Quantity</TableCell>
              <TableCell size='medium' align="right">Tax</TableCell>
              <TableCell size='medium' align="right">Discount</TableCell>
              <TableCell size='medium' align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
        <Pagination page={selectedPage} onChange={handleOnChangePagination} count={Math.ceil(orders.length / 10) } variant="outlined" color="primary" />
      </TableContainer>
    </>
  );
}
