$mapping = @{
    'Adwaith Abhi Muv ig and Media lead.jpeg' = 'adwaith.jpeg'
    'Anandhu Krishnan Comics ig.jpeg' = 'anandhu.jpeg'
    'Ann Mary JobTech sublead.jpeg' = 'ann_mary.jpeg'
    'Ansiya H Design sub lead.jpeg' = 'ansiya.jpeg'
    'Gayathri S Civil ig.jpeg' = 'gayathri.jpeg'
    'Irin Ann ShajiOperation team lead.jpeg' = 'irin.jpeg'
    'Iwin Sajimon P Tech sublead.jpeg' = 'iwin.jpeg'
    'Jini Shiju  Co lead.jpeg' = 'jini.jpeg'
    'Joyanna B Co lead and HR ig.jpeg' = 'joyanna.jpeg'
    'Jubit A Jacob Space ig.jpeg' = 'jubit.jpeg'
    'Nandhana P B Civil ig.jpeg' = 'nandhana.jpeg'
    'Naveen monachan Muv ig and Media sublead.jpeg' = 'naveen.jpeg'
    'Nelphy Anna JojiOperation team.jpeg' = 'nelphy.jpeg'
    'Niranjana P AOperation team.jpeg' = 'niranjana.jpeg'
    'Priyanka Design lead.jpeg' = 'priyanka.jpeg'
    'Rennees Biju Muv ig and Media sublead.jpeg' = 'rennees.jpeg'
    'Reuben Sam Philip Inter of mulearn foundation Campus management zonal lead Web ig.jpeg' = 'reuben.jpeg'
    'Tech lead & Cybersecurity IG Lead Abin Mathew Thomas.jpeg' = 'abin.jpeg'
    'V S Geethu campus lead.jpeg' = 'geethu.jpeg'
}

foreach ($key in $mapping.Keys) {
    $src = Join-Path 'images' $key
    $dst = Join-Path 'mulearn-mbccet-assets\team' $mapping[$key]
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Force
        Write-Host "Copied $key to $dst"
    } else {
        Write-Host "File not found: $src"
    }
}

$achievements = @('cyber101.jpeg', 'dist_lead.jpeg', 'enabeler.jpg', 'figma.jpeg', 'goodbye.jpeg', 'ig_lead.jpeg')
foreach ($ach in $achievements) {
    $src = Join-Path 'images' $ach
    $dst = Join-Path 'mulearn-mbccet-assets\achievements' $ach
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Force
        Write-Host "Copied $ach to $dst"
    } else {
        Write-Host "File not found: $src"
    }
}
