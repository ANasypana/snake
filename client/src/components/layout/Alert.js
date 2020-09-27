import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    alerts: state.alert

});

export const Alert = connect(mapStateToProps)(({alerts}) => alerts !== null && alerts.length > 0 &&
    alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>))

    );
