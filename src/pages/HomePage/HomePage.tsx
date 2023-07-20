import { useEffect, useState } from "react";
import axios from "axios";
import { KEY } from "../../const/API_KEY";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import ItemFeature from "../../components/UI/ItemFeature/ItemFeatture";

const HomePage = (): JSX.Element => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    console.log(data);

    var url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "2a1b9339498065f10b7a189c8214b38f30a1150d";
    var query = "Курджипская";

    var options: any = {
      method: "POST",
      /*       mode: "cors", */
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: query }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) =>
        setOptions(
          result.suggestions
            .filter((el: any) => el.value)
            .map((item: any) => item.value)
        )
      )
      .catch((error) => console.log("error", error));
  }, [data]);

  const handleGetForecast = (event: any) => {
    event.preventDefault();
    const city = event?.target?.city_name?.value;
    setCity(city);

    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=" +
          KEY +
          "&q=" +
          city +
          "&aqi=no"
      )
      .then((res) => setData(res))
      .catch((err) => console.log(err.message));
  };

  const features = [
    { title: "Температура", value: "27" },
    { title: "Облачность", value: "10" },
    { title: "Скорость ветра", value: "270" },
    { title: "Направление ветра", value: "W" },
    { title: "Восход", value: "04:40" },
    { title: "Закат", value: "20:30" },
  ];

  return (
    <Container>
      <form
        onSubmit={handleGetForecast}
        style={{ display: "flex", width: "100%" }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          style={{ background: "white", display: "flex", width: "inherit" }}
          renderInput={(params) => (
            <TextField {...params} label="Начните печатать..." />
          )}
        />

        <Button
          type="submit"
          style={{
            paddingTop: "15px",
            paddingBottom: "15px",
            marginLeft: "10px",
            width: "80px",
          }}
          color="info"
          variant="outlined"
        >
          OK
        </Button>
      </form>
      <Paper elevation={3} sx={{ mt: 4 }}>
        <Grid>
          {features.map((feature) => (
            <ItemFeature
              title={feature.title}
              value={feature.value}
              key={feature.title}
            />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
