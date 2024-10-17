import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

////////////////////// YOUR CODE HERE //////////////////////

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");
  console.log(userId);

  const getBlogs = async () => {
    await axios
      .get(`http://localhost:8000/filter?userId=${userId}`)
      .then((res) => {
        const blogs = res.data;
        console.log(blogs);
        setBlogs(blogs);
      });
  };

  return (
    <div className="BlogList">
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={getBlogs}
          margin="normal"
          padding="normal"
        >
          Load Blogs
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1150 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author Name</StyledTableCell>
              <StyledTableCell>Author Email</StyledTableCell>
              <StyledTableCell>Body</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell component="th" scope="row">
                  {blog.title}
                </TableCell>
                <TableCell>{blog.author.name}</TableCell>
                <TableCell>{blog.author.email}</TableCell>
                <TableCell>{blog.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

////////////////////// YOUR CODE HERE //////////////////////

export default BlogList;
