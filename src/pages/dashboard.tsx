import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false /** estilizar depois */,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-09-06T00:00:00.000Z",
      "2022-09-07T00:00:00.000Z",
      "2022-09-08T00:00:00.000Z",
      "2022-09-09T00:00:00.000Z",
      "2022-09-10T00:00:00.000Z",
      "2022-09-11T00:00:00.000Z",
      "2022-09-12T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series-1", data: [31, 120, 10, 28, 51, 18, 109] }];

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Dashgo</title>
      </Head>

      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my={6} maxW={1480} mx="auto" px={6}>
          <Sidebar />

          {/* flex=1 ocupa a largura que sobrou no flex, pois a sidebar tem tamanho expecífico*/}
          <SimpleGrid
            flex={1}
            gap={4}
            minChildWidth="320px" // quebra automáticamente abaixo de 320px de tela
            // align="flex-start"
          >
            <Box p={{ base: 6, md: 8 }} bg="gray.800" borderRadius={8} pb={4}>
              <Text fontSize="lg" mb={4}>
                Inscritos da semana
              </Text>

              {/**
               * options = propriedades
               * series = dados
               */}
              <Chart
                options={options}
                series={series}
                type="area"
                height={160}
              />
            </Box>

            <Box
              p={8}
              bg="gray.800"
              borderRadius={8}
              //pb={4}
            >
              <Text fontSize="lg" mb={4}>
                Taxa de abertura
              </Text>

              {/**
               * options = propriedades
               * series = dados
               */}
              <Chart
                options={options}
                series={[
                  ...series,
                  { name: "series-2", data: [41, 120, 40, 90, 25, 150, 79] },
                ]}
                type="area"
                height={160}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
