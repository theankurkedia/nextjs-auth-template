import Head from "next/head";
export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>
          NextJS Auth {props.titleSuffix ? ` - ${props.titleSuffix}` : ""}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{props.children}</main>
    </div>
  );
}
