<?php

namespace App\Http\Controllers;

use App\Bo\CompanyBo;
use App\Models\Company;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::with('contact')->get();
        return Inertia::render('Company/Index', [
            'companies' => $companies
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Company/Maintenance', [
            'action' => route('company.store'),
            'method' => "post"
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'company_name' => ['required'],
                'company_email' => ['required', 'email'],
                'contact_name_1' => ['required'],
                'contact_last_name_1' => ['required']
            ]
        );

        try{
            DB::beginTransaction();
            CompanyBo::create($request->input());
            DB::commit();
            return to_route('company.index');
        }catch(Exception $e){
            DB::rollBack();
            return redirect()->back()->with('erro', $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $company = Company::with('contact')->find($id);
        return Inertia::render('Company/Maintenance', [
            'action' => route('company.update', $id),
            'method' => "put",
            'company' => $company
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            DB::beginTransaction();
            CompanyBo::update($request->input(), $id);
            DB::commit();
            return to_route('company.index');
        }
        catch(Exception $e){
            DB::rollBack();
            return redirect()->back()->with('erro', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            DB::beginTransaction();
            $company = Company::find($id);
            if($company){
                $company->delete();
                $message = "Empresa excluida com sucesso";
            }else{
                $message = "Empresa não encontrada";
            }
            DB::commit();
            $companies = Company::with('contact')->get();
            return response()->json([
                'message' => $message,
                'companies' => $companies
            ]);
        }
        catch(Exception $e){
            DB::rollBack();
            return redirect()->back()->with('erro', $e->getMessage());
        }
    }
}
