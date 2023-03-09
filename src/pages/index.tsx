import { type NextPage } from "next";
import Head from "next/head";
import { TodosList } from "~/components/TodosList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta content="My Todo App" />
        <title>My Todo App</title>
      </Head>
      <TodosList heading="My Todo List" />
    </>
  );
};

export default Home;
