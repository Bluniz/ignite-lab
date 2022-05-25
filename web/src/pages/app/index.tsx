import { gql, useQuery } from "@apollo/client";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const user = useUser();

  //const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  return (
    <div>
      <div>
        <pre>{JSON.stringify(data.products, null, 2)}</pre>

        <pre>{JSON.stringify(user, null, 2)}</pre>

        <a href="api/auth/logout">Logout</a>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    //const data = await getServerPageGetProducts(null, ctx);

    return getServerPageGetProducts(null, ctx);
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
