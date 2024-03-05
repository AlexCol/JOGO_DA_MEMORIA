using backEnd.src.Extensions.toApp;
using backEnd.src.Extensions.toBuilder;

var builder = WebApplication.CreateBuilder(args);
builder.addDependencies(builder.Configuration);

var app = builder.Build();
app.addDependencies();

app.Run();
