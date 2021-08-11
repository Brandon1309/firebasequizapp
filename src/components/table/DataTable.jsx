import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { getAllUsersFromDb } from "../../features/users/userDataSlice";

const DataTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersFromDb());
    console.log(allUsers && allUsers);
  }, []);

  const allUsers = useSelector(
    (state) => state.persistedReducer.userData.allUsers
  );

  // const ImageCell = ({ rowData, dataKey, ...rest }) => (
  //   <Cell {...rest}>
  //     <img src={rowData[dataKey]} width="100" alt="User profile" />
  //   </Cell>
  // );
  // const ImageCell = ({ rowData, dataKey, ...props }) => (
  //   <Cell {...props} style={{ padding: 0 }}>
  //     <div
  //       style={{
  //         width: 60,
  //         height: 60,
  //         background: "#f5f5f5",
  //         borderRadius: 2000,
  //         marginTop: 2,
  //         marginBottom: 2,
  //         overflow: "hidden",
  //         display: "inline-block",
  //         // objectFit: "contain",
  //       }}
  //     >
  //       <img src={rowData[dataKey]} width="44" />
  //     </div>
  //   </Cell>
  // );

  return (
    <div>
      {/* <Table data={allUsers} rowHeight="100" flexGrow> */}
      <Table height={450} data={allUsers} id="table">
        {/* <Column align="center">
          <HeaderCell>User Photo</HeaderCell>
          <ImageCell dataKey="photoUrl" />
        </Column> */}
        <Column align="center" flexGrow>
          <HeaderCell>Display Name</HeaderCell>
          <Cell dataKey="displayName" />
        </Column>
        <Column align="center" flexGrow>
          <HeaderCell>Total Quizzes</HeaderCell>
          <Cell dataKey="numberOfQuizzes"></Cell>
        </Column>
        <Column sortColumn align="center" flexGrow>
          <HeaderCell>Top Score </HeaderCell>
          <Cell dataKey="highestScore"></Cell>
        </Column>
      </Table>
    </div>
  );
};

export default DataTable;
