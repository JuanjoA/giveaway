defmodule Giveaway.Repo do
  use Ecto.Repo,
    otp_app: :giveaway,
    adapter: Ecto.Adapters.Postgres
end
