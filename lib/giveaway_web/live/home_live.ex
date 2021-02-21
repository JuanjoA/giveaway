defmodule GiveawayWeb.HomeLive do
  use GiveawayWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, query: "", result: "")}
  end

  def handle_event("get_number", %{}, socket) do

    {:noreply, socket
    |> assign(result: Enum.random(101..1000))}
    Process.sleep(1000)
    {:noreply, socket
    |> assign(result: Enum.random(1..100))}
  end
end
