defmodule GiveawayWeb.HomeLive do
  use GiveawayWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, query: "", result: "")}
  end

  def handle_event("get_number", %{}, socket) do
    Process.sleep(1000)

    {:noreply,
     socket
     |> assign(result: Enum.random(100_001..999_999))}
  end
end
