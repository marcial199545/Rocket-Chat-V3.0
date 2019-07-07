import React, { Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import User from "../users/User";
import Chat from "../notification/Chat";
const Dashboard = ({ loading }: { loading: boolean }) => {
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <section className="container container__dashboard">
                <h1 className="large text-primary">Welcome</h1>
                <div className="user">
                    <User />
                </div>
                <Chat />
            </section>
        </Fragment>
    );
};
const mapStateToProps = (state: any) => ({
    loading: state.auth.loading
});

export default connect(mapStateToProps)(Dashboard);
