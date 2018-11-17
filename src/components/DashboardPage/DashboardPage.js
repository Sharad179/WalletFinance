import React from 'react';
import { withRouter } from 'react-router-dom';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderComponent } from '../HeaderComponent/HeaderComponent';
import { ContactComponent } from '../ContactComponent/ContactComponent';
import { HorizontalTable } from '../TableComponent/HorizontalTable';
import { VerticalTable } from '../TableComponent/VerticalTable';
import { GaugechartComponent } from '../HighchartComponent/GaugechartComponent';
import './DashboardPage.css';
// import {HighchartComponent} from '../HighchartComponent/HighchartComponent';

// var element;

// // Create and render element
// element = React.createElement(HighchartComponent, { container: 'chart', options: options });
// ReactDOM.render(element, document.getElementById('react-app'));
// import { userActions } from '../_actions';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "scoreone": "", "cibilScore": "655", "riskbasedFitment": "", "previousRecord": [],"firstName":"","age":"","residOffStabilty":"","maritalStatus":"" };
        this.handleChange = this.handleChange.bind(this);

    }
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    componentDidMount() {
        const customer = this.getParameterByName("firstName");
        console.log("customer", customer);
        var _this = this;
        fetch('http://ec2-13-233-180-15.ap-south-1.compute.amazonaws.com/app/walletScoreByName?firstName=' + customer, {
            method: 'GET'
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            console.log(body);
            _this.setState({ "previousRecord": body["previousRecord"], "scoreone": parseInt(body["score"]), "riskbasedFitment": body["RiskBasedPricingGrid"],"firstName":body["firstName"],"age":body["age"],"residOffStabilty":body["currentResidenceStability"],"maritalStatus":body["maritalStatus"] });

        });
    }
    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    render() {
        const { user, users } = this.props;
        const customer = {};
        return (
            <div>
                <HeaderComponent header="Dashboard" />

                <div className="body_background">
                    <div className="container-fluid ">
                        <div className="row">
                            <div className="col-sm-3">


                                <VerticalTable tablehead={"PL - Salary Advance"} heading={[{ field: "Name", value: this.state.firstName }, { field: "Age", value: this.state.age }, { field: "Residential/Office Stability", value: this.state.residOffStabilty }, { field: "Marital Status", value: this.state.maritalStatus }]} panelHeight="650px" />

                            </div>
                            <div className="col-sm-8 col-sm-offset-1 form_part">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card my-5" style={{ backgroundColor: '#F0F0F0', border: "0", bordeRadius: "1rem", boxShadow: "0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)" }}>
                                            {this.state.scoreone ? <div className="card-body">
                                                <h3 className="card-title choose_portfolio_head" style={{ textAlign: "center" }}>Retra Score</h3>
                                                <p style={{ textAlign: "center" }}><button className="btn btn-default"><b>{this.state.scoreone}</b></button></p>
                                                <GaugechartComponent container='retrascore1' scoreval={parseInt(this.state.scoreone)} titleval="Retra Score 1" />
                                            </div> : ""}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        

                                                <VerticalTable tablehead={"RISK BASED FITMENT GRID"} heading={[{ field: "Retra Score", value: this.state.scoreone }, { field: "Pricing", value: this.state.riskbasedFitment }]} panelHeight="388px" />
                                            
                                    </div>
                                </div>


                                <div className="row">&nbsp;</div>
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="card card-signin my-5" style={{ backgroundColor: '#F0F0F0', height: "243px" }}>
                                            <div className="card-body">
                                                <h3 className="card-title text-centerchoose_portfolio_head"><b>INTELLI-MATCH (DEDUPING)</b></h3>
                                                {this.state.previousRecord.length > 0 ? <HorizontalTable tablehead={""} bodyvalues={this.state.previousRecord} panelHeight="150px" /> : <h4 style={{ textAlign: "center" }}>No Previous Records Found</h4>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <ContactComponent />

            </div >

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default withRouter(connect(mapStateToProps)(DashboardPage));