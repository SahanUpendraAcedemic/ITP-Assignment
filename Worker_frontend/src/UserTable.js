import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UserTable = ({rows, selectedUser, deleteUser}) => {

    return(
    <TableContainer component={Paper}>
        <table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>License</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                   rows.length > 0 ? rows.map(row => (
                        <TableRow key={row.id} sx={{'&:last-child td, &:last-child th' : {border:0}}}>
                            <TableCell component='th' scope="row">{row.id}</TableCell>
                            <TableCell component='th' scope="row">{row.name}</TableCell>
                            <TableCell component='th' scope="row">{row.number}</TableCell>
                            <TableCell component='th' scope="row">{row.email}</TableCell>
                            <TableCell component='th' scope="row">{row.address}</TableCell>
                            <TableCell component='th' scope="row">{row.license}</TableCell>
                            <TableCell component='th' scope="row">{row.username}</TableCell>
                            <TableCell component='th' scope="row">{row.password}</TableCell>
                            <TableCell>
                                <Button sx={{margin:'0px 10px' }} onClick={() =>selectedUser({id:row.id, name:row.name,number:row.number, email:row.email,
                                address:row.address, license:row.license, username:row.username, password:row.password})}>
                                    Update
                                </Button>
                                <Button sx={{margin:'0px 10px' }} onClick={() => deleteUser({id:row.id})}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                        
                    )) : (
                        <TableRow sx={{'&:last-child td, &:last-child th' : {border:0},}}>
                            <TableCell component='th' scope="row">No Data</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </table>
    </TableContainer>
    );

}

export default UserTable;