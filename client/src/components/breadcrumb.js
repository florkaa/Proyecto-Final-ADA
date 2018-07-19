import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import "../css/breadcrumb.css";
import Result from "./result";
import Item from "./item";

export const Breadcrumb = ({ filters }) => (
	<ul className="breadcrumb">
        {filters.map(function(value, index){
            return <li key={index} value={ index }>{value}</li>;
        })}
	</ul>
);