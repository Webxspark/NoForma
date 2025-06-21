<?php

namespace App\Http\Controllers;

use App\Models\Clients;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use function Termwind\render;

class clientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('clients/index', [
            'clients' => Clients::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('clients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|max:255',
            'phone' => 'required|max:15',
            'company' => 'required',
            'status' => 'in:new,followed-up,in-progress,completed'
        ]);

        $client = Clients::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'company' => $request->company,
            'status' => $request->status
        ]);

        return redirect()->route('clients.index')->with('success', 'Client created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $client = Clients::find($id);
        if(!$client){
            return redirect()->route('clients.index')->with('error', 'Client not found.');
        }
        $client->delete();
        return redirect()->route('clients.index')->with('success', 'Client deleted successfully.');
    }
}
