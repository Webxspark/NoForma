<?php

namespace App\Http\Controllers;

use App\Mail\ClientMailer;
use App\Models\Clients;
use App\Models\Moms;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use function Pest\Laravel\json;

class momsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('moms/index', [
            'moms' => Moms::with('client')
                ->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'client_name' => 'required|string',
            'client_email' => 'required|string',
            'client_phone' => 'required|string',
            'ai_summary' => 'required|string',
            'requirements' => 'required|string',
            'requirement_summary' => 'required|string',
            'notes' => 'required|string',
            'suggestions' => 'required|string',
        ]);
        // Check if client already exists
        // In your store method, modify the client creation part:
        $client = Clients::firstOrCreate(
            [
                'email' => $request->client_email, // Query condition - check by email only
            ],
            [
                'name' => $request->client_name,
                'phone' => $request->client_phone,
                'status' => 'new',
                'company' => "Unknown"
            ]
        );
        $moms = Moms::create([
            'client_id' => $client->id,
            'ai_summary' => $request->ai_summary,
            'requirements' => $request->requirements,
            'requirement_summary' => $request->requirement_summary,
            'notes' => $request->notes,
            'suggestions' => $request->suggestions,
            'status' => 'new'
        ]);
        //send email to client
//        Mail::to($client->email)
//            ->send(new ClientMailer());'

        return response()->json([
            'message' => "MOMs created successfully.",
            'moms' => $moms
        ])->setStatusCode(201);
    }

    public function updateStatus(Request $request): RedirectResponse
    {
        $request->validate([
            'id' => 'required|integer|exists:moms,id',
            'status' => 'required|in:new,followed-up,in-progress,completed'
        ]);

        $moms = Moms::find($request->id);
        if (!$moms) {
            return to_route('moms.index')->with('error', 'MOMs not found.');
        }

        $moms->status = $request->status;
        $moms->save();

        // Redirect back to the same page with flash message
        return back()->with('success', 'MOMs status updated successfully.');
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

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
