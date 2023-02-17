// This is a component that renders a single square
export default function  TicTacToeBoardCell(props) {
    
    return (

        <td

            style={{

                cursor:

                    props.cells[props.num] === "" &&
                        turn === Players.Human.symbol &&
                        !winner
                        ? "crosshair"
                        : "not-allowed",

            }}

            onClick={() => humanTurn(props.num)}

        >
            {props.cells[props.num]}

        </td>
    );

};