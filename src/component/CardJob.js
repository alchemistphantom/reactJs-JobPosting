import React from "react";

import styles from "../pages/Jobs/ResultJob/Resultjob.css";
import { Card } from "react-bootstrap";
import DateUtils from "../helper/DateUtils";

const inDays = function(d1, d2) {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
};

const CardJob = props => {
  const { name, company, date_added, location, salary, category } = props.data;
  const current = new Date(date_added);
  const now = new Date();
  return (
    <Card
      style={{ border: props.styles }}
      onClick={() => (props.getIdjob(), props.showCard())}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
        <Card.Text>{location}</Card.Text>
        <Card.Text>Easily apply</Card.Text>
        <Card.Text>
          <b>Rp. {salary} per bulan</b>
        </Card.Text>
        <Card.Text>{category}</Card.Text>
        <Card.Link href="#">
          <p>{inDays(new Date(date_added), now)} days ago</p>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CardJob;
