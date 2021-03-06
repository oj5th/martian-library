Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  if Rails.env.development?
    post "/graphql", to: "graphql#execute"
  end

  root "library#index"
end
