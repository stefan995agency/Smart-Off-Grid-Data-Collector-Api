<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('power_source', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['solar', 'wind', 'water']); // mozda bi trebalo da se dodaju i baterije
            $table->integer('max_power'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('power_source');
    }
};
