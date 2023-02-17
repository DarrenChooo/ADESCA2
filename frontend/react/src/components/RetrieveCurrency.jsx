export default function RetrieveCurrency(props) {

    return (
        <div id="displayCurrency" className="wrap">
      
            {props.currency.map((currency) => {
                return ( 
                        <div className="currencyCard" key={currency.userid}>
                            <span className="displayDiv1">Username: {currency.username}</span>
                            <span className="displayDiv2">User ID: {currency.userid}</span>
                            <span className="displayDiv3">Quantity: {currency.quantity}</span>
                            <span className="displayDiv4">Currency ID: {currency.currencyid}</span>
                            <a className="button" href={"/admin/react_update_currency.html?userid="+currency.userid}>
                                <button type="button" id="updateIdButton">Update</button>
                            </a>
                        </div>
                )
            })}
        
        </div>
    );


}